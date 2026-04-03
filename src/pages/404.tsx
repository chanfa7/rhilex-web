import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

const NoFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-gray-800">404</h1>
        <p className="mt-4 text-lg text-gray-600">
          <FormattedMessage id="page.404.subTitle" />
        </p>
        <Button type="primary" className="mt-6" onClick={() => navigate('/')}>
          <FormattedMessage id="button.homePage" />
        </Button>
      </div>
    </div>
  );
};

export default NoFoundPage;
