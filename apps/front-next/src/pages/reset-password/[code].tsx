import { ensureNotLoggedIn } from 'src/common/helper';
import { ResetPasswordPage } from 'src/features/resetPassword/ResetPasswordPage';

export default ResetPasswordPage;

export const getServerSideProps = ensureNotLoggedIn;
