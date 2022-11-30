import { type NextPage } from "next";
import { Layout } from "../components/layout/layout";
import { DashboardPage } from "../components/page-components/dashboard-page";

const Home: NextPage = () => {
  return (
    <Layout>
      <DashboardPage />
    </Layout>
  );
};

export default Home;
