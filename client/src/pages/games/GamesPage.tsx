import React, { useEffect, useState } from "react";
import useHttpService from "../../api/useHttpService";
import { Game } from "../../types/types";
import GameItem from "./GameItem";
import PageLayout from "../../components/common/PageLayout";
import toast from "react-hot-toast";
import PaginatedList from "../../components/common/PaginatedList";
import FilterComponent, {
  Filters,
} from "./FilterComponent";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { Box, Grid } from "@mui/material";

const PAGE_SIZE_LIMIT = 20;
const initFilters = {
  categories: [],
  keyword: "",
  sortBy: "",
};

export default function GamesPage() {
  const [games, setGames] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [filters, setFilters] = useState<Filters>(initFilters);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const httpService = useHttpService();

  useEffect(() => {
    getGames(currentPage);
  }, [currentPage, filters]);

  const getGames = async (page: number) => {
    /* TODO - move to service */
    try {
      setLoading(true);
      const response = await httpService.get("/games", {
        params: {
          page,
          limit: PAGE_SIZE_LIMIT,
          categories: filters.categories,
        },
      });
      const { games, totalCount } = response.data;
      setGames(games);
      setTotalCount(totalCount);
    } catch {
      toast.error("Issue loading games, try again later");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <PageLayout title="Games">
      <FilterComponent setFilters={setFilters} />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <PaginatedList
          currentPage={currentPage}
          listLength={totalCount}
          itemsPerPage={PAGE_SIZE_LIMIT}
          onPageChange={handlePageChange}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              {games.map((game: Game) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={game.id}>
                  <GameItem game={game} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </PaginatedList>
      )}
    </PageLayout>
  );
}
