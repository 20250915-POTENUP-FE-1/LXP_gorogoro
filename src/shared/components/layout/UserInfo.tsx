import { cookies } from 'next/headers';
import { REFRESH_TOKEN } from '@/shared/constants/token';
import { getMe } from '@/services/user.service';
import { refreshApi } from '@/shared/lib/refreshApi';

export default async function UserInfo() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(REFRESH_TOKEN)?.value;

  if (!refreshToken) {
    return (
      <div aria-label="로그인 안내" role="status">
        로그인을 해보세요
      </div>
    );
  }

  const me = await getMe().catch(async (error) => refreshApi(error));
  return (
    <div aria-label="사용자 인사말" role="status">
      {me?.name}님, 안녕하세요!
    </div>
  );
}
