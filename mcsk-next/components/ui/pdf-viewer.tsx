'use client'

import { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

interface PDFViewerProps {
  url: string
  title: string
}

export default function PDFViewer({ url, title }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [scale, setScale] = useState<number>(1.0)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
    setIsLoading(false)
  }

  function changePage(offset: number) {
    setPageNumber(prevPageNumber => prevPageNumber + offset)
  }

  function previousPage() {
    if (pageNumber > 1) {
      changePage(-1)
    }
  }

  function nextPage() {
    if (pageNumber < numPages) {
      changePage(1)
    }
  }

  function zoomIn() {
    setScale(prevScale => Math.min(prevScale + 0.2, 2.0))
  }

  function zoomOut() {
    setScale(prevScale => Math.max(prevScale - 0.2, 0.6))
  }

  function resetZoom() {
    setScale(1.0)
  }

  return (
    <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-4">
      <div className="w-full flex justify-between items-center mb-4 px-4">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={zoomOut}
                  disabled={scale <= 0.6}
                >
                  <i className="fas fa-search-minus"></i>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Zoom Out</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={resetZoom}
                >
                  <i className="fas fa-sync-alt"></i>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Reset Zoom</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={zoomIn}
                  disabled={scale >= 2.0}
                >
                  <i className="fas fa-search-plus"></i>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Zoom In</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="relative w-full overflow-auto">
        <div className="flex justify-center min-h-[600px] bg-slate-100 rounded-lg">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-100/80">
              <div className="text-blue-600 text-2xl animate-spin">
                <i className="fas fa-circle-notch"></i>
              </div>
            </div>
          )}
          <Document
            file={url}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex items-center justify-center h-full">
                <div className="text-blue-600 text-2xl animate-spin">
                  <i className="fas fa-circle-notch"></i>
                </div>
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className="shadow-lg"
            />
          </Document>
        </div>
      </div>

      {numPages > 0 && (
        <div className="flex items-center justify-between w-full mt-4 px-4">
          <div className="flex items-center space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={previousPage}
                    disabled={pageNumber <= 1}
                  >
                    <i className="fas fa-chevron-left"></i>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Previous Page</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <span className="text-sm text-slate-600">
              Page {pageNumber} of {numPages}
            </span>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={nextPage}
                    disabled={pageNumber >= numPages}
                  >
                    <i className="fas fa-chevron-right"></i>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Next Page</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <a
            href={url}
            download
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition duration-300"
          >
            <i className="fas fa-download mr-2"></i>
            Download PDF
          </a>
        </div>
      )}
    </div>
  )
} 