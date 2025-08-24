import { getTags } from "@/apis/tag.api";
import { QUERY_KEYS } from "@/constants/query-keys.constant";
import { PaginationParams } from "@/types/common.type";
import { useQuery } from "@tanstack/react-query";

export const useGetTags = (params?: PaginationParams) => {
  const { data, ...rest } = useQuery({
    queryKey: [QUERY_KEYS.TAGS, params],
    queryFn: () => getTags(params),
  });

  return { data: data?.data ?? [], ...rest };
};
