<?php

namespace App\Http\Controllers;

use App\Http\Requests\PdfRequest;
use Smalot\PdfParser\Parser;

class PdfController extends Controller
{
    public function extractText(PdfRequest $request)
    {

        $pdfFile = $request->file('pdf');
        $parser = new Parser();
        try {
            $pdf = $parser->parseFile($pdfFile->getPathname());
            $text = $pdf->getText();

            return response()->json([
                'success' => true,
                'message' =>  __('pdf.successful_extraction'),
                'text' => $text
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => __('pdf.error'),
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
