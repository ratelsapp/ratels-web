import XLSX from "xlsx";

export interface ELSXHeader {
  title: string;
  dataIndex: string | number;
  key: string | number;
  className?: string;
}

export const exportExcel = (
  headers: ELSXHeader[],
  data: any[],
  fileName = "data.xlsx"
) => {
  const _headers = headers
    .map((item, i) =>
      Object.assign(
        {},
        {
          key: item.key,
          title: item.title,
          position: String.fromCharCode(65 + i) + 1,
        }
      )
    )
    .reduce(
      (prev, next) =>
        Object.assign({}, prev, {
          [next.position]: { key: next.key, v: next.title },
        }),
      {}
    );
  const _data = data
    .map((item, i) =>
      headers.map((key, j) =>
        Object.assign(
          {},
          {
            content: item[key.key],
            position: String.fromCharCode(65 + j) + (i + 2),
          }
        )
      )
    )
    .reduce((prev, next) => prev.concat(next))
    .reduce(
      (prev, next) =>
        Object.assign({}, prev, { [next.position]: { v: next.content } }),
      {}
    );

  const output = Object.assign({}, _headers, _data);

  const outputPos = Object.keys(output);

  const ref = `${outputPos[0]}:${outputPos[outputPos.length - 1]}`;

  const wb = {
    SheetNames: ["mySheet"],
    Sheets: {
      mySheet: Object.assign({}, output, {
        "!ref": ref,
        "!cols": [
          { wpx: 45 },
          { wpx: 100 },
          { wpx: 200 },
          { wpx: 80 },
          { wpx: 150 },
          { wpx: 100 },
          { wpx: 300 },
          { wpx: 300 },
        ],
      }),
    },
  };

  XLSX.writeFile(wb, fileName);
};
