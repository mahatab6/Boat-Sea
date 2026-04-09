/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { getUserInfo } from "@/services/auth.services";
import { useState, useEffect } from "react";


export const useUser = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setIsLoading(true);
                const data = await getUserInfo();
                setUser(data);
            } catch (error : any) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, []);

   
    return { user, isLoading, error };
};