import React, { useEffect, useState } from "react";
import useHttpService from "../../api/useHttpService";
import { Game } from "../../types/types";
import GameItem from "./GameItem";
import PageLayout from "../../components/common/PageLayout";
import toast from "react-hot-toast";
import PaginatedList from "../../components/common/PaginatedList";
import FilterComponent, {
  Filters,
} from "../../components/common/FilterComponent";

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
  }, [currentPage]);

  const getGames = async (page: number) => {
    try {
      setLoading(true);
      const response = await httpService.get("/games", {
        params: {
          page,
          limit: PAGE_SIZE_LIMIT,
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
    <PageLayout title="Games" loading={loading}>
      <FilterComponent setFilters={setFilters} />
      <PaginatedList
        currentPage={currentPage}
        listLength={totalCount}
        itemsPerPage={PAGE_SIZE_LIMIT}
        onPageChange={handlePageChange}
      >
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {games.map((game: Game) => (
            <GameItem key={game.id} game={game} />
          ))}
        </div>
      </PaginatedList>
    </PageLayout>
  );
}
