import * as React from 'react';
import {useContext} from 'react';
import Table from '@mui/material/Table';
import {PeriodContext} from './PeriodContext';

export default function PeriodTable() {
    const {periods} = useContext(PeriodContext);

    return (
        <Table aria-label="basic table">
            <thead style={{backgroundColor: '#ead5d6'}}>
            <tr>
                <th>Start Date</th>
                <th>End Date</th>
            </tr>
            </thead>
            <tbody>
            {periods.map((period, index) => (
                <tr key={index}>
                    <td>{new Date(period.startDate).toLocaleDateString()}</td>
                    <td>{new Date(period.endDate).toLocaleDateString()}</td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
}