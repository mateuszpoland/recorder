<?php
declare(strict_types=1);

namespace Records\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Records\Entity\CDCarrier;
use Records\Entity\Mp3Carrier;
use Records\Entity\Track;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $tracks = [
            new Track('El Polako', 'Don Guralesko'),
            new Track('Trochę czasu', 'Don Guralesko'),
            new Track('Giovanni Dziadzia', 'Don Guralesko'),
            new Track('Mandala', 'Don Guralesko')
        ];
        $carrier1 = new CDCarrier();
        $carrier1 = $carrier1->fillData('Don Guralesko the Best of', new \DateTime());
        foreach ($tracks as $track) {
            $carrier1->addTrack($track);
        }

        $manager->persist($carrier1);

        $tracks = [
            new Track('Bohemian Rhapsody', 'Queen'),
            new Track('Livin on a Prayer', 'Bon Jovi'),
            new Track('Explosion', 'Kalwi & Remi'),
            new Track('L Amours Toujours', 'Gigi D Agostino'),
        ];

        $carrier2 = new Mp3Carrier();
        $carrier2 = $carrier2->fillData('Składanka do auta', new \DateTime());
        foreach ($tracks as $track) {
            $carrier2->addTrack($track);
        }

        $manager->persist($carrier2);

        $manager->flush();
        $manager->flush();
    }
}
