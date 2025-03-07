<?php

namespace App\Http\Controllers;

use App\Http\Requests\PdfRequest;
use Smalot\PdfParser\Parser;
use App\Http\Controllers\OpenAIController;
use Illuminate\Support\Facades\Log;


class PdfController extends Controller
{
    public function extractText(PdfRequest $request)
    {
        $open = new OpenAIController();

        $pdfFile = $request->file('pdf');
        $parser = new Parser();

        try {
            $pdf = $parser->parseFile($pdfFile->getPathname());
            $text = $pdf->getText();

            Log::debug('PDF CONTROLLER text- '. $text);

            $response = $open->getAIflashcards($text);

            return response()->json([
                'success' => true,
                'message' =>  __('pdf.successful_extraction'),
                'answer' => $response
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
