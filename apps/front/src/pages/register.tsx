import { ensureNotLoggedIn } from 'src/common/helper';
import { RegisterPage } from 'src/features/register/RegisterPage';

export default RegisterPage;

export const getServerSideProps = ensureNotLoggedIn;
