import Layout from "@/src/layout/Layout";
import { GetServerSideProps } from "next";
import LocationsPage from "@/src/components/page-components/Locations";

export default function Page() {
  return (
    <Layout>
      <LocationsPage />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
