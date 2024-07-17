import React from 'react';
import { useMemo } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

// function TT_GEN({ TT_TT_data }) {
//   return (
//     <div>
//       {TT_TT_data.length > 0 && (
//         <table>
//           <thead>
//             <tr>
//               {Object.keys(TT_TT_data[0]).map((key, index) => (
//                 <th key={index}>{key}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {TT_TT_data.map((row, index) => (
//               <tr key={index}>
//                 {Object.values(row).map((value, i) => (
//                   <td key={i}>{value.toString()}</td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// function TT_GEN({TT_TT_data}){
//   const columns = TT_TT_data.length > 0 ? Object.keys(TT_TT_data[0]).map(key => ({
//     title: key,
//     TT_dataIndex: key,
//     key,
//   })) : [];


//   const TT_dataSource = TT_TT_data.map((item, index) => ({ key: index, ...item }));
//   return <Table columns={columns} TT_dataSource={TT_dataSource} />;
// }



function rearrangeKeyValuePairs(TT_data) {
  return TT_data.map(obj => {
    // Get the keys of the object
    const keys = Object.keys(obj);

    if (keys.length < 2) {
      return obj;
    }

    const newObj = {};
    newObj[keys[0]] = obj[keys[0]]; // First key-value pair

   // skipping the second one
    for (let i = 2; i < keys.length; i++) {
      newObj[keys[i]] = obj[keys[i]];
    }
    newObj[keys[1]] = obj[keys[1]]; // addiing it last
    return newObj;
  });
}


function TT_GEN({ TT_data }) {
  const editedObj = rearrangeKeyValuePairs(TT_data);


  const columns = editedObj.length > 0 ? Object.keys(editedObj[0]) : [];

  return (
    <TableContainer className = "Truth-TableContainer" component={Paper}>
      <Table className = "Truth-Table">
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell key={index}>{column.toUpperCase()}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {TT_data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column, colIndex) => (
                <TableCell key={colIndex}>{row[column].toString().toUpperCase()}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TT_GEN;
