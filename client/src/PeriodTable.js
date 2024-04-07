import * as React from 'react';
import {useContext} from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import {PeriodContext} from './PeriodContext';

export default function PeriodTable() {
    const {periods} = useContext(PeriodContext);

    return (
        <TableContainer component={Paper} style={{maxHeight: 350, overflow: 'auto'}}>
            <Table aria-label="basic table" stickyHeader>
                <TableHead style={{backgroundColor: '#ead5d6'}}>
                    <TableRow>
                        <TableCell>Start Date</TableCell>
                        <TableCell>End Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {periods.map((period, index) => (
                        <TableRow key={index}>
                            <TableCell>{new Date(period.startDate).toLocaleDateString()}</TableCell>
                            <TableCell>{new Date(period.endDate).toLocaleDateString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}