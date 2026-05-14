import Layout from "@/src/layout/Layout";
import { GetServerSideProps } from "next";
import CharacterDetail from "@/src/components/page-components/CharacterDetail";

export default function Page() {
  return (
    <Layout>
      <CharacterDetail />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
