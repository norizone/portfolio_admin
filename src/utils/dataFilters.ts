/**
 * 値が'' , null , undifindの場合 frue
 */
export const isEmpty = (value: any) => {
  return value === '' || value === null || value === undefined
}
