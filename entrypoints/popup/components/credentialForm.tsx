import { IFormData, useFormData } from "@/entrypoints/hooks/formData";
import { Eye, EyeOff } from "lucide-react";
import React from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";



export default function CredentialFrom() {
    const [showApi, setApi] = useState(false);
    const { formData, setFormData } = useFormData();

    const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const {name, value} = e.target;
      setFormData((prev: IFormData) => ({ ...prev, [name]: value}));
    };

    const handlersubmit = (e: React.FormEvent) => {
      e.preventDefault();
      chrome.storage.local.set({formData}, () => {
        toast.success("API credentials saved successfully");
      });
    };

    console.log(formData);

    return (
        // Kita beri sedikit padding (p-4) dan lebar (w-72) agar tidak terlalu sempit
    <div className="p-4 w-72 bg-gray-50 rounded-md">
      
    {/* Kita gunakan tag <form> sebagai pembungkus. 
      'className="space-y-4"' memberi jarak otomatis antar elemen di dalamnya.
    */}

      <div className="text-2xl ml-15 font-bold">
        <h1>API configure</h1>
      </div>

      <div className="text-lg m-5 ml-22 mt-0">
        <p>Enter your api</p>
      </div>

    <form className="space-y-4" onSubmit={handlersubmit}>
      
      {/* --- Bagian Input Endpoint --- */}
      <div>
        <label 
          htmlFor="endpoint" 
          className="block text-sm font-medium text-gray-700"
        >
          Endpoint
        </label>
        <input
          type="url"
          value={formData?.endpoint}
          onChange={handlerChange}
          required
          id="endpoint"
          name="endpoint"
          placeholder="https://api.example.com"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* --- Bagian Input API Key --- */}
      <div>
        <label 
          htmlFor="apiKey" 
          className="block text-sm font-medium text-gray-700"
        >
          API Key
        </label>
        <input
          type={showApi ? "text" : "password"}
          value={formData?.apikey}
          onChange={handlerChange}
          required
          id="apiKey"
          name="apikey"
          placeholder="sk-..."
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div className="absolute inset-y-0 right-0 flex item-center pr-3 mt-35 mr-5">
        <button
          type="button"
          onClick={() => setApi(!showApi)}
          className="text-gray-400"
          title={showApi ? "Hide Api Key" : "Show Api Key"}
        >
          {showApi ? 
          (<EyeOff className="h-5 w-5"/>) : (<Eye className="h-5 w-5"/>)}
          <span className="sr-only">
            {showApi ? "Hide Api Key" : "Show Api Key"}
          </span>
        </button>
      </div>

      {/* --- Tombol Save --- */}
      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
      >
        Save
      </button>
    </form>
  </div>
    );
}