import React, { useState } from "react";
import { Box, Table, Tbody, Tr, Td, Input, Button } from "@chakra-ui/react";

type SubRow = {
	values: (string | number)[];
};

export type TableRow = {
	values: (string | number)[];
	subRows?: SubRow[];
};

const BetterTable = () => {
	const [tableDataRows, setTableDataRows] = useState<TableRow[]>([
		{ values: ["Type of question", "Answer"] },
		{
			values: ["Dani", 10],
		},
		{
			values: ["Gio", 11],
		},
	]);

	const handleAddRow = () => {
		const newRow: TableRow = {
			values: tableDataRows[0].values.map(() => ""),
		};

		setTableDataRows([...tableDataRows, newRow]);
	};

	const handleAddColumn = () => {
		const updatedData = tableDataRows.map((row) => ({
			...row,
			values: [...row.values, ""],
			subRows: row.subRows
				? row.subRows.map((subRow) => ({
						...subRow,
						values: [...subRow.values, ""],
				  }))
				: undefined,
		}));

		setTableDataRows(updatedData);
	};

	const handleSubRowChange = (
		rowIndex: number,
		subRowIndex: number,
		colIndex: number,
		value: string | number
	) => {
		const updatedData = tableDataRows.map((row, i) => ({
			...row,
			subRows:
				i === rowIndex
					? row.subRows
						? row.subRows.map((subRow, j) =>
								j === subRowIndex
									? {
											...subRow,
											values: subRow.values.map((subValue, k) =>
												k === colIndex ? value : subValue
											),
									  }
									: subRow
						  )
						: undefined
					: row.subRows,
		}));

		setTableDataRows(updatedData);
	};

	const handleCellChange = (
		rowIndex: number,
		colIndex: number,
		value: string | number
	) => {
		const updatedData = tableDataRows.map((row, i) => ({
			...row,
			values:
				i === rowIndex
					? row.values.map((val, j) => (j === colIndex ? value : val))
					: row.values,
		}));

		setTableDataRows(updatedData);
	};

	const handleAddSubrow = (rowIndex: number) => {
		const updatedData = tableDataRows.map((row, i) => ({
			...row,
			subRows:
				i === rowIndex
					? [...(row.subRows || []), { values: ["", ""] }]
					: row.subRows,
		}));

		setTableDataRows(updatedData);
	};

	return (
		<Box p={4}>
			<Table variant="simple" colorScheme="purple">
				<Tbody>
					{tableDataRows.map((row, rowIndex) => (
						<>
							<Tr>
								{row.values.map((value, colIndex) => (
									<Td key={colIndex}>
										<Input
											value={value}
											onChange={(e) =>
												handleCellChange(rowIndex, colIndex, e.target.value)
											}
										/>
									</Td>
								))}
								<Td>
									{rowIndex !== 0 && (
										<Button onClick={() => handleAddSubrow(rowIndex)}>
											Add Subrow
										</Button>
									)}
								</Td>
							</Tr>
							{row.subRows &&
								row.subRows.map((subRow, subRowIndex) => (
									<Tr key={subRowIndex}>
										{subRow.values.map((value, colIndex) => (
											<Td key={colIndex}>
												<Input
													value={value}
													onChange={(e) =>
														handleSubRowChange(
															rowIndex,
															subRowIndex,
															colIndex,
															e.target.value
														)
													}
													textAlign="right"
												/>
											</Td>
										))}
									</Tr>
								))}
						</>
					))}
				</Tbody>
			</Table>
			<Button mt={4} onClick={handleAddRow}>
				Add Row
			</Button>
			<Button mt={4} ml={2} onClick={handleAddColumn}>
				Add Column
			</Button>
		</Box>
	);
};

export default BetterTable;
