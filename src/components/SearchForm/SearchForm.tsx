import React from "react";
import { Button, Input } from "@/components/ui/index";
import { useApiResponseContext } from "@/context/ApiResponseContext";
import { fetchApiData } from "@/api/ApiClient";
import Laptop from "@/assets/images/laptop.png";
import SearchResults from "./SearchResult";
import { useGlobalPaymentResponseContext } from "@/context";

function SearchForm() {
  const [searchType, setSearchType] = React.useState("documento");
  const [searchValue, setSearchValue] = React.useState("");
  const { setGlobalPaymentResponse, setLoading } =
    useGlobalPaymentResponseContext();
  const { apiResponse, setApiResponse } = useApiResponseContext();
  const handleSearchTypeChange = (type: string) => {
    setSearchType(type);
    setApiResponse(null);
    setSearchValue("");
    setGlobalPaymentResponse(null)
    setLoading(false)
  };

  const handleSearch = async () => {
    if (!searchValue) return; // Evitar búsquedas vacías
    const endpoint = searchType === "factura" ? "invoices" : "users/invoices";
    const data = await fetchApiData(endpoint, searchValue);
    if (data) {
      setApiResponse(data);
      setSearchValue("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center font-[Poppins]">
      <div className="flex flex-row w-full justify-between relative">
        <div className="w-full md:w-1/2 flex flex-col items-center p-4">
          <div className="font-semibold text-3xl md:text-6xl lg:text-6xl xl:text-8xl xl:text-left text-center p-10">
            ¡Paga tu factura Red Planet fácil y rápido!
          </div>
          <div className="p-10 items-center flex">
            <button
              onClick={() => handleSearchTypeChange("factura")}
              className={`text-white ${
                searchType === "factura" ? "bg-[#5e1774]" : "bg-[#6d5372]"
              } rounded-l-full p-3 md:text-2xl`}
            >
              Numero de factura
            </button>
            <button
              onClick={() => handleSearchTypeChange("documento")}
              className={`text-white ${
                searchType === "documento" ? "bg-[#5e1774]" : "bg-[#6d5372]"
              } rounded-r-full p-3 md:text-2xl`}
            >
              Numero de identificación
            </button>
          </div>
          {apiResponse ? (
            //TODO: implement seach result component
            <SearchResults data={apiResponse} />
          ) : (
            <div className="w-full md:w-5/12 text-center">
              <Input
                type="number"
                value={searchValue}
                onChange={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => setSearchValue(e.target.value)}
                placeholder={
                  searchType === "factura"
                    ? "Escribe tu factura"
                    : "Escribe tu documento o nit"
                }
                className="block placeholder:text-center"
              />
              <Button
                variant={"secondary"}
                onClick={handleSearch}
                className="mt-5 bg-[#5e1774] text-white"
              >
                Consultar
              </Button>
            </div>
          )}
        </div>

        <div className="hidden md:block absolute inset-0 flex items-center justify-center md:static md:w-1/2">
          <img
            src={Laptop}
            alt="Imagen"
            className="max-w-full mt-20"
            width={700}
            height={500}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchForm;
