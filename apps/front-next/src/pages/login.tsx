import { ensureNotLoggedIn } from 'src/common/helper';
import { LoginPage } from 'src/features/login/LoginPage';

export default LoginPage;

export const getServerSideProps = ensureNotLoggedIn;
