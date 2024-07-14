import React from 'react';

function TT_GEN({ TT_data }) {
  return (
    <div>
      {TT_data.length > 0 && (
        <table>
          <thead>
            <tr>
              {Object.keys(TT_data[0]).map((key, index) => (
                <th key={index}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TT_data.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, i) => (
                  <td key={i}>{value.toString()}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TT_GEN;
