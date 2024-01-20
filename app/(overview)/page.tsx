import Link from "next/link";
import React from "react";

function HomePage() {
  return (
    <div>
      <Link href={"/create-workspace"} className="btn btn-outline btn-primary">
        Create Workspace
      </Link>
    </div>
  );
}

export default HomePage;
