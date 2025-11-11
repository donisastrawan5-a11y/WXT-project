import React from "react";
import { useEffect } from "react";

export interface IFormData {
    apikey: string;
    endpoint: string;
}

export const useFormData = () => {
    const [formData, setFormData] = React.useState<IFormData>({
        apikey: "",
        endpoint: "",
    });

    useEffect(() => {
        chrome.storage.local.get(["formData"], (result) => {
            if (result.formData) {
                setFormData(result.formData);
            }
        });
    }, []);

    return { formData, setFormData };
};