import { useParams } from "react-router-dom";
import { Table } from "../components";
import { useTableStore } from "../utils/store";

const ViewScore = () => {
  const { id } = useParams();
  const { table } = useTableStore();
  console.log(id);
  console.log(table);

  return (
    <section className="relative mx-auto mt-24 mb-12">
      <div className="px-5 lg:px-0">
        <Table data={table} />
      </div>
    </section>
  );
};

export default ViewScore;
