import EpisodesPage from "@/src/components/page-components/Episodes";
import Layout from "@/src/layout/Layout";
import { GetServerSideProps } from "next";

export default function Page() {
  return (
    <Layout>
      <EpisodesPage />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
