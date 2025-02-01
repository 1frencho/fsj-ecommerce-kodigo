import { memo, useMemo, useRef, useState, useEffect, useCallback } from 'react';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import {
  type ColDef,
  ModuleRegistry,
  type RowSelectionOptions,
} from '@ag-grid-community/core';
import { AgGridReact } from '@ag-grid-community/react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { MotionDiv } from '../content/MotionDiv';
// import { AG_GRID_LOCALE_ES } from './localeText';
// import * as XLSX from 'xlsx';

import './styles/ag-grid.css';
import './styles/ag-theme-material.css';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

interface EnhancedTableProps<T> {
  rowData: T[];
  columnDefs: ColDef[];
  defaultColDef?: ColDef;
  rowSelection?: RowSelectionOptions;
  paginationPageSize?: number;
}

const EnhancedTable = <T,>({
  rowData,
  columnDefs,
  defaultColDef,
  paginationPageSize = 5,
}: EnhancedTableProps<T>) => {
  const gridRef = useRef<AgGridReact>(null);

  const [logoImg, setLogoImg] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = '/assets/logos/mainLogo.webp';
    img.onload = () => setLogoImg(img);
  }, []);

  const excludedFields = useMemo(
    () => ['img_url', 'avatar_url', 'logo_url', 'image_url', 'actions'],
    [],
  );

  const filteredColumnDefs = useMemo(
    () =>
      columnDefs.filter((col) => !excludedFields.includes(col.field as string)),
    [columnDefs, excludedFields],
  );

  const tableRows = useMemo(
    () =>
      rowData.map((row) =>
        filteredColumnDefs.map(
          (col) => (row as Record<string, unknown>)[col.field || ''] || '',
        ),
      ),
    [rowData, filteredColumnDefs],
  );

  const mergedDefaultColDef = useMemo(
    () => ({
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      sortable: true,
      flex: 1, // Distribuye el ancho equitativamente entre todas las columnas
      resizable: true, // Permite ajustar el ancho de las columnas manualmente
      minWidth: 140, // Ajusta el ancho mínimo de las columnas
      editable: false, // Deshabilita la edición para todas las columnas
      cellStyle: { userSelect: 'text' }, // Habilita la selección de texto en las celdas
      ...defaultColDef,
    }),
    [defaultColDef],
  );

  const handleExportPDF = useCallback(() => {
    const doc = new jsPDF();
    const primaryColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--primary')
      .trim();
    const secondaryColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--secondary')
      .trim();

    if (logoImg) {
      doc.addImage(logoImg, 'WEBP', 10, 10, 60, 20);
    }

    doc.text('Reporte de Tabla', 80, 20);
    doc.autoTable({
      head: [filteredColumnDefs.map((col) => col.headerName || '')],
      body: tableRows,
      startY: 30,
      headStyles: {
        fillColor: primaryColor || '#204280',
        textColor: '#FFFFFF',
      },
      bodyStyles: {
        fillColor: secondaryColor || '#857850',
        textColor: '#000000',
      },
    });

    doc.save('tabla-exportada.pdf');
  }, [filteredColumnDefs, tableRows, logoImg]);

  // const handleExportExcel = useCallback(() => {
  //   const worksheetData = [
  //     filteredColumnDefs.map((col) => col.headerName || ''), // Headers
  //     ...tableRows, // Rows
  //   ];

  //   // Crear hoja de cálculo
  //   const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');

  //   // Generar archivo y descargar
  //   const excelBuffer = XLSX.write(workbook, {
  //     bookType: 'xlsx',
  //     type: 'array',
  //   });
  //   const blob = new Blob([excelBuffer], {
  //     type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  //   });

  //   const url = window.URL.createObjectURL(blob);
  //   const link = document.createElement('a');
  //   link.href = url;
  //   link.setAttribute('download', 'tabla-exportada.xlsx');
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // }, [filteredColumnDefs, tableRows]);

  return (
    <MotionDiv className="ag-theme-material w-full">
      <div className="mb-4 flex justify-end gap-2">
        <button onClick={handleExportPDF} className="mySecondaryBtn">
          Exportar a PDF
        </button>
        {/* <button onClick={handleExportExcel} className="myPrimaryBtn">
          Exportar a Excel
        </button> */}
      </div>
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={mergedDefaultColDef}
        pagination={true}
        paginationPageSize={paginationPageSize}
        domLayout="autoHeight"
        // localeText={AG_GRID_LOCALE_ES}
        enableCellTextSelection={true}
      />
    </MotionDiv>
  );
};

export default memo(EnhancedTable);
