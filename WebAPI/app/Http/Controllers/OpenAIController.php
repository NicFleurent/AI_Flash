<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use GuzzleHttp\Client;

class OpenAIController extends Controller
{
    public function getAIflashcards(Request $request)
    {
        try {
            $data = $request->all();
            $question = $data['question'] ?? '';
            $key = env('OPENAI_API_KEY');

            $client = new Client();

            $payload = [
                'model' => 'gpt-4o',
                'messages' => [
                    ['role' => 'system', 'content' => 'Provide your responses in a key-value dictionary format where each key is a concept or principle, and the value is the corresponding definition or description. The key can be the concept or principle, and the value should be a concise definition. Do not include examples or extra details, just the definition.'],
                    ['role' => 'user', 'content' => $question],
                ],
                'max_tokens'=> 8192
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
            $content = preg_replace('/^```json|\n?```$/', '', $content);
            Log::debug("Content " . $content);

            return response()->json([
                'message' => 'Question recuuuu et voici réponse',
                'answer' => $content
            ]);
        } catch (\Throwable $e) {
            Log::debug("Error - " . $e->getMessage());
            return response()->json([
                'message' => 'Erreur - ' . $e->getMessage()
            ], 500);
        }

    }
}
