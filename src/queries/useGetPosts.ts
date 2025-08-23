import { getPosts } from "@/apis/post.api";
import { QUERY_KEYS } from "@/constants/query-keys.constant";
import { PaginationParams } from "@/types/common.type";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

interface UseGetPostsProps {
  params?: PaginationParams;
  enabled?: boolean;
}

export const useGetPosts = (props: UseGetPostsProps) => {
  const { params, enabled = true } = props;

  const data = useQuery({
    queryKey: [QUERY_KEYS.POSTS, params],
    queryFn: () => getPosts(params),
    enabled,
    placeholderData: keepPreviousData,
  });

  return { ...data };
};
