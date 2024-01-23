import { Table } from "../components";


const ViewScore = () => {


  return (
    <section className="relative mx-auto mt-24 mb-12">
      <div className="px-5 lg:px-0">
        <Table
          data={
            searchText
              ? (searchedData as unknown as TableDataProps[])
              : tableData
          }
        />
      </div>
    </section>
  );
};

export default ViewScore;
