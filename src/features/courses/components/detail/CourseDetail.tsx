'use client';

import styles from './CourseDetail.module.css';
import { CourseDetailResponse, TabKey } from '../../types';
import { addToCart } from '@/services/cart.service';
import { useModalStore } from '@/stores/useModalStore';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CourseCurriculum from './CourseCurriculum';
import CourseSidebar from '@/features/courses/components/detail/CourseSidebar';
import CourseTabs from '@/features/courses/components/detail/CourseTabs';
import CourseOverview from '@/features/courses/components/detail/CourseOverview';
import CourseDescription from '@/features/courses/components/detail/CourseDescription';
import CourseReview from '@/features/courses/components/detail/CourseReview';
import CourseRequest from '@/features/courses/components/detail/CourseRequest';

interface CourseDetailProps {
  course: CourseDetailResponse;
}

export default function CourseDetail({ course }: CourseDetailProps) {
  const router = useRouter();
  const { openModal } = useModalStore();
  const handleCartError = (error: unknown) => {
    if (error instanceof Error) {
      if (error.message.includes('409'))
        openModal({
          title: '장바구니',
          message: '이미 장바구니에 담겨있습니다.',
        });
      return;
    } else {
      openModal({
        title: '장바구니',
        message: '장바구니 추가에 실패했습니다. 다시 시도해주세요',
      });
    }
  };
  const [activeTab, setActiveTab] = useState<TabKey>('description');
  const handleChangeTab = (selectedTab: TabKey) => {
    setActiveTab(selectedTab);
  };
  const onAddToCart = async () => {
    try {
      await addToCart(course.courseId);
      openModal({
        title: '장바구니',
        message: '장바구니에 잘 담겼습니다.',
      });
    } catch (error: unknown) {
      handleCartError(error);
    }
  };
  const onCheckout = async () => {
    try {
      await addToCart(course.courseId);
      router.push('/cart');
    } catch (error: unknown) {
      router.push('/cart');
      handleCartError(error);
    }
  };
  return (
    <>
      <section className={styles.detail}>
        <div className={styles.layout}>
          <div className={styles.main}>
            <CourseOverview course={course} />
            <CourseTabs activeTab={activeTab} handleChangeTab={handleChangeTab} />
            <section className={styles.section}>
              {activeTab === 'description' && <CourseDescription course={course} />}
              {activeTab === 'curriculum' && (
                <CourseCurriculum contents={course.chapters || []} mode="view" />
              )}
              {activeTab === 'review' && <CourseReview course={course} />}
              {activeTab === 'request' && <CourseRequest course={course} />}
            </section>
          </div>
          <CourseSidebar
            course={course}
            onAddToCart={onAddToCart}
            onCheckout={onCheckout}
          ></CourseSidebar>
        </div>
      </section>
    </>
  );
}
