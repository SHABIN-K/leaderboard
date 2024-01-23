import { useParams } from "react-router-dom";
import { Table } from "../components";

const ViewScore = () => {
  const { id } = useParams();
  console.log(id);

  return (
    <section className="relative mx-auto mt-24 mb-12">
      <div className="px-5 lg:px-0">
        <Table data={tableData} />
      </div>
    </section>
  );
};

export default ViewScore;
