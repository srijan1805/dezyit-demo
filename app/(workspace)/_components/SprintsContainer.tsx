import { Sprint } from "@/types";
import React from "react";
import SprintCard from "./SprintCard";
import Spinner from "@/components/ui/Spinner";

type Props = {
    sprints: Sprint[];
    loading?: boolean;
};

function SprintsContainer({ sprints, loading = false }: Props) {
    return (
        <>
            {loading ? (
                <Spinner />
            ) : sprints.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-3 lg:gap-4 w-full">
                    {sprints.map((s, i) => (
                        <SprintCard key={s._id} sprint={s} />
                    ))}
                </div>
            ) : (
                <div>No sprints to show</div>
            )}
        </>
    );
}

export default SprintsContainer;
