import * as React from 'react';
import Table from '@mui/material/Table';

export default function PeriodTable() {
    return (
        <Table aria-label="basic table">
            <thead style={{backgroundColor: '#ead5d6'}}>
            <tr>
                <th>Start Date</th>
                <th>End Date</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>2023-04-01</td>
                <td>2023-04-15</td>
            </tr>
            </tbody>
        </Table>
    );
}
