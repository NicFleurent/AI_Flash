<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class FlashcardsSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    DB::table('flashcards')->insert([
      [
        'front_face' => 'Encapsulation',
        'back_face' => 'Principe de POO qui protège les données',
        'last_revision_date' => Carbon::now('America/Toronto'),
        'next_revision_date' => Carbon::now('America/Toronto'),
        'forgetting_curve_stage' => 0,
        'collection_id' => 2,
      ],
      [
        'front_face' => 'Polymorphisme',
        'back_face' => 'Capacité d\'une méthode à s\'adapter selon l\'objet',
        'last_revision_date' => Carbon::now('America/Toronto')->subDays(3),
        'next_revision_date' => Carbon::now('America/Toronto')->addDays(4),
        'forgetting_curve_stage' => 2,
        'collection_id' => 3,
      ],
      [
        'front_face' => 'Héritage en POO',
        'back_face' => 'Mécanisme permettant à une classe d\'hériter d\'une autre',
        'last_revision_date' => Carbon::now('America/Toronto')->subDays(180),
        'next_revision_date' => Carbon::now('America/Toronto'),
        'forgetting_curve_stage' => 4,
        'collection_id' => 4,
      ],
      [
        'front_face' => 'JavaScript',
        'back_face' => 'Langage de programmation pour le web',
        'last_revision_date' => Carbon::now('America/Toronto')->subDays(7),
        'next_revision_date' => Carbon::now('America/Toronto'),
        'forgetting_curve_stage' => 2,
        'collection_id' => 5,
      ],
      [
        'front_face' => 'Python',
        'back_face' => 'Langage de programmation interprété et polyvalent',
        'last_revision_date' => Carbon::now('America/Toronto')->subDays(30),
        'next_revision_date' => Carbon::now('America/Toronto'),
        'forgetting_curve_stage' => 3,
        'collection_id' => 5,
      ],
      [
        'front_face' => 'HTML',
        'back_face' => 'Langage de balisage pour la création de pages web',
        'last_revision_date' => Carbon::now('America/Toronto')->subDays(7),
        'next_revision_date' => Carbon::now('America/Toronto'),
        'forgetting_curve_stage' => 5,
        'collection_id' => 5,
      ],
      [
        'front_face' => 'CSS',
        'back_face' => 'Langage de styles utilisé pour mettre en forme les pages web',
        'last_revision_date' => Carbon::now('America/Toronto'),
        'next_revision_date' => Carbon::now('America/Toronto'),
        'forgetting_curve_stage' => 1,
        'collection_id' => 5,
      ],
      [
        'front_face' => 'DNS',
        'back_face' => 'Système de noms de domaine',
        'last_revision_date' => Carbon::now('America/Toronto')->subDays(2),
        'next_revision_date' => Carbon::now('America/Toronto')->addDays(5),
        'forgetting_curve_stage' => 1,
        'collection_id' => 6,
      ],
      [
        'front_face' => 'Système binaire',
        'back_face' => 'Représentation numérique utilisée en informatique',
        'last_revision_date' => Carbon::now('America/Toronto')->subDays(2),
        'next_revision_date' => Carbon::now('America/Toronto')->addDays(1),
        'forgetting_curve_stage' => 1,
        'collection_id' => 6,
      ],
      [
        'front_face' => 'TCP/IP',
        'back_face' => 'Protocole de communication utilisé sur Internet',
        'last_revision_date' => Carbon::now('America/Toronto')->subDays(2),
        'next_revision_date' => Carbon::now('America/Toronto')->addDays(2),
        'forgetting_curve_stage' => 1,
        'collection_id' => 7,
      ],
      [
        'front_face' => 'SSH',
        'back_face' => 'Protocole sécurisé pour l\'accès à distance',
        'last_revision_date' => Carbon::now('America/Toronto')->subDays(2),
        'next_revision_date' => Carbon::now('America/Toronto')->addDays(3),
        'forgetting_curve_stage' => 1,
        'collection_id' => 7,
      ],
      [
        'front_face' => 'Cloud Computing',
        'back_face' => 'Modèle de prestation de services informatiques à distance',
        'last_revision_date' => Carbon::now('America/Toronto')->subDays(2),
        'next_revision_date' => Carbon::now('America/Toronto')->addDays(4),
        'forgetting_curve_stage' => 1,
        'collection_id' => 8,
      ],
      [
        'front_face' => 'Machine Virtuelle',
        'back_face' => 'Logiciel simulant un ordinateur physique',
        'last_revision_date' => Carbon::now('America/Toronto')->subDays(2),
        'next_revision_date' => Carbon::now('America/Toronto')->addDays(5),
        'forgetting_curve_stage' => 1,
        'collection_id' => 8,
      ],
      [
        'front_face' => 'Différence entre HTTP et HTTPS',
        'back_face' => 'HTTPS sécurise les communications grâce au chiffrement TLS',
        'last_revision_date' => Carbon::now('America/Toronto')->subDays(2),
        'next_revision_date' => Carbon::now('America/Toronto')->addDays(3),
        'forgetting_curve_stage' => 1,
        'collection_id' => 8,
      ],
      [
        'front_face' => 'SQL',
        'back_face' => 'Langage de requêtage pour bases de données',
        'last_revision_date' => Carbon::now('America/Toronto')->subDays(2),
        'next_revision_date' => Carbon::now('America/Toronto')->addDays(4),
        'forgetting_curve_stage' => 1,
        'collection_id' => 9,
      ],
      [
        'front_face' => 'Kali Linux',
        'back_face' => 'Distribution Linux spécialisée en cybersécurité',
        'last_revision_date' => Carbon::now('America/Toronto')->subDays(2),
        'next_revision_date' => Carbon::now('America/Toronto')->addDays(3),
        'forgetting_curve_stage' => 1,
        'collection_id' => 9,
      ],
      [
        'front_face' => 'Phishing',
        'back_face' => 'Technique d\'hameçonnage utilisée en cybersécurité',
        'last_revision_date' => Carbon::now('America/Toronto')->subDays(2),
        'next_revision_date' => Carbon::now('America/Toronto')->addDays(3),
        'forgetting_curve_stage' => 1,
        'collection_id' => 9,
      ],
      [
        'front_face' => 'Pare-feu',
        'back_face' => 'Dispositif de sécurité réseau',
        'last_revision_date' => Carbon::now('America/Toronto')->subDays(2),
        'next_revision_date' => Carbon::now('America/Toronto')->addDays(4),
        'forgetting_curve_stage' => 1,
        'collection_id' => 9,
      ],
      [
        'front_face' => 'Réseaux neuronaux',
        'back_face' => 'Modèle d\'apprentissage inspiré du cerveau humain',
        'last_revision_date' => Carbon::now('America/Toronto')->subDays(2),
        'next_revision_date' => Carbon::now('America/Toronto')->addDays(5),
        'forgetting_curve_stage' => 1,
        'collection_id' => 10,
      ],
      [
        'front_face' => 'Intelligence Artificielle',
        'back_face' => 'Simulation de l\'intelligence humaine par des machines',
        'last_revision_date' => Carbon::now('America/Toronto')->subDays(2),
        'next_revision_date' => Carbon::now('America/Toronto')->addDays(1),
        'forgetting_curve_stage' => 1,
        'collection_id' => 10,
      ],
      [
        'front_face' => 'Machine Learning',
        'back_face' => 'Sous-domaine de l\'intelligence artificielle axé sur l\'apprentissage automatique',
        'last_revision_date' => Carbon::now('America/Toronto')->subDays(2),
        'next_revision_date' => Carbon::now('America/Toronto')->addDays(4),
        'forgetting_curve_stage' => 1,
        'collection_id' => 10,
      ],
      [
        'front_face' => 'Big Data',
        'back_face' => 'Traitement et analyse de grands ensembles de données',
        'last_revision_date' => Carbon::now('America/Toronto')->subDays(2),
        'next_revision_date' => Carbon::now('America/Toronto')->addDays(5),
        'forgetting_curve_stage' => 1,
        'collection_id' => 10,
      ],
      [
        'front_face' => 'Éthique de Kant',
        'back_face' => 'Déontologie et impératif catégorique',
        'last_revision_date' => Carbon::now('America/Toronto')->subDays(2),
        'next_revision_date' => Carbon::now('America/Toronto')->addDays(5),
        'forgetting_curve_stage' => 1,
        'collection_id' => 11,
      ],
      [
        'front_face' => 'Métaphysique',
        'back_face' => 'Branche de la philosophie qui étudie la nature de la réalité',
        'last_revision_date' => Carbon::now('America/Toronto')->subDays(2),
        'next_revision_date' => Carbon::now('America/Toronto'),
        'forgetting_curve_stage' => 1,
        'collection_id' => 12,
      ],
      [
        'front_face' => 'Épistémologie',
        'back_face' => 'Branche de la philosophie qui étudie la connaissance',
        'last_revision_date' => Carbon::now('America/Toronto')->subDays(2),
        'next_revision_date' => Carbon::now('America/Toronto'),
        'forgetting_curve_stage' => 1,
        'collection_id' => 12,
      ],
      [
        'front_face' => 'Logique',
        'back_face' => 'Étude des principes du raisonnement valide',
        'last_revision_date' => Carbon::now('America/Toronto')->subDays(2),
        'next_revision_date' => Carbon::now('America/Toronto')->addDays(3),
        'forgetting_curve_stage' => 1,
        'collection_id' => 12,
      ],
      [
        'front_face' => 'Éthique',
        'back_face' => 'Branche de la philosophie qui étudie la morale et les valeurs',
        'last_revision_date' => Carbon::now('America/Toronto')->subDays(2),
        'next_revision_date' => Carbon::now('America/Toronto')->addDays(4),
        'forgetting_curve_stage' => 1,
        'collection_id' => 12,
      ],
    ]);
  }
}
