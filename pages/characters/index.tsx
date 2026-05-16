import Layout from "@/src/components/layout/Layout";
import CharactersPage from "@/src/components/page-components/Characters";
import CharacterPageProvider from "@/src/providers/CharacterPageProvider";

export default function Home() {
  return (
    <Layout>
      <CharacterPageProvider>
        <CharactersPage />
      </CharacterPageProvider>
    </Layout>
  );
}
