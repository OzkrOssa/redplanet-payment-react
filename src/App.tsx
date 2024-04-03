import { ApiResponseProvider } from "@/context/ApiResponseContext";
import SearchForm from "@/components/SearchForm/SearchForm";
import Logo from "@/assets/images/logo.png"

function App() {
  return (
    <ApiResponseProvider>
      {/* Header */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-center md:justify-between lg:justify-between xl:justify-between items-center p-4 bg-white bg-opacity-90 shadow-lg">
        <img src={Logo} alt="Red Planet Logo" width={200} height={32} />
      </nav>
      {/* Search Form */}
      <SearchForm />
    </ApiResponseProvider>
  );
}

export default App;
