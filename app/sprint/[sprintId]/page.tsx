import React from "react";

type Props = {
    params: {
        sprintId: string;
    };
};

function SprintPage({ params }: Props) {
    console.log(params);
    return <div>{params.sprintId}</div>;
}

export default SprintPage;
