<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use GuzzleHttp\Client;

class OpenAIController extends Controller
{
    public function getAIflashcards($question)
    {
        try {
            $key = env('OPENAI_API_KEY');

            $client = new Client();

            $payload = [
                'model' => 'gpt-4o',
                'messages' => [
                    ['role' => 'system', 'content' => 'Extract key concepts, principles, and important definitions from the provided text and present them as a dictionary. Each key should be a concept or principle, and the corresponding value should be a concise definition or description. Do not include examples or extra details. The output should be in dictionary format. And a minimum of 50. You can give more.'],
                    ['role' => 'user', 'content' => $question],
                ],
                'max_tokens' => 8192
            ];

            $response = $client->post('https://api.openai.com/v1/chat/completions', [
                'headers' => [
                    'Authorization' => 'Bearer ' . $key,
                    'Content-Type'  => 'application/json',
                ],
                'json' => $payload,
                'curl' => [
                    CURLOPT_SSL_VERIFYPEER => false,
                ],
            ]);

            $responseBody = json_decode($response->getBody()->getContents(), true);
            Log::debug("Body " . $responseBody['choices'][0]['message']['content']);

            $content = $responseBody['choices'][0]['message']['content'];
            $content = preg_replace('/^```python|\n?```$/', '', $content);
            Log::debug("Content " . $content);

            return $content;

            // return response()->json([
            //     'message' => 'Question recuuuu et voici réponse',
            //     'answer' => $content
            // ]);
        } catch (\Throwable $e) {
            Log::debug("Error - " . $e->getMessage());
            return 'erreur';
            // return response()->json([
            //     'message' => 'Erreur - ' . $e->getMessage()
            // ], 500);
        }
    }
}
