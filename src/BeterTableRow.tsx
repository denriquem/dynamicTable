import React from "react";
import { TableRow } from "./BetterTable";
import { Tr, Input, Td, Button } from "@chakra-ui/react";

interface RowProps {
	row: TableRow;
	rowIndex: number;
	handleSubRowChange: (
		rowIndex: number,
		subRowIndex: number,
		colIndex: number,
		value: number | string
	) => void;
	handleCellChange: (
		rowIndex: number,
		colIndex: number,
		value: number | string
	) => void;
	handleAddSubrow: (rowIndex: number) => void;
}

function BeterTableRow({
	row,
	rowIndex,
	handleSubRowChange,
	handleCellChange,
	handleAddSubrow,
}: RowProps) {
	if (!row.subRows) {
		return (
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
			</>
		);
	}

	return (
		<>
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
								/>
							</Td>
						))}
					</Tr>
				))}
		</>
	);
}

export default BeterTableRow;
