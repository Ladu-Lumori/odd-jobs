import { supabase } from "./api";
export const fetchJobs = async (query) => {
    let { data: jobs, error } = await supabase
      .from("jobs")
      .select(query)
      .order("id", { ascending: false });
    if (error) console.log("error", error);
    else {
        return {
            jobs,
            error
        }
    }
  };