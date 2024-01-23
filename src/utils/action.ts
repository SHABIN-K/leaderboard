// actions.ts
export const SET_TABLE_DATA = "SET_TABLE_DATA";

interface SetTableDataAction {
  type: typeof SET_TABLE_DATA;
  payload: YourDataType; // Replace YourDataType with the type of your data
}

export const setTableData = (data: YourDataType): SetTableDataAction => ({
  type: SET_TABLE_DATA,
  payload: data,
});

export type ActionTypes = SetTableDataAction;
