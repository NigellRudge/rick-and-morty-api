import CharacterPageProvider from "@/providers/CharacterPageProvider";
import CharactersPage from "@/page-components/Characters";
import Layout from "@/layout/Layout";

export default function Home() {
  return (
    <Layout>
      <CharacterPageProvider>
        <CharactersPage />
      </CharacterPageProvider>
    </Layout>
  );
}
