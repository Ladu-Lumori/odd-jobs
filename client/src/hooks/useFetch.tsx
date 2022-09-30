import { useMemo } from "react";
import { supabase } from "../lib/api";

export const useFetch = async (table, { filter }) => {
    const { data, error } = await supabase
        .from(table)
        .select(filter)
        .order("id", { ascending: false });

    return useMemo(
        () => ({
            error,
            data
        }),
        [error, data]
    );
}