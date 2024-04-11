import ConnectedLayout from "@/components/ConnectedLayout/ConnectedLayout";

export default function Search() {
  return (
    <ConnectedLayout>
      <div className="mt-10 md:w-[700px] mx-auto w-full">
        {/* search */}

        <form>
          <input type="search" placeholder="Rechercher" className="input" />
        </form>
        {/* search */}
        <div className="mt-32 text-center text-threads-gray-light">
          Recherchez des profils a découvrir
        </div>
      </div>
    </ConnectedLayout>
  );
}
