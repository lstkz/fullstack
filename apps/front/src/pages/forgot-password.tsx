import { ensureNotLoggedIn } from 'src/common/helper';
import { ForgotPasswordPage } from 'src/features/forgotPassword/ForgotPasswordPage';

export default ForgotPasswordPage;

export const getServerSideProps = ensureNotLoggedIn;
