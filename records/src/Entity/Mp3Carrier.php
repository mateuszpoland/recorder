<?php
declare(strict_types=1);

namespace Records\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 */
class Mp3Carrier extends Carrier
{
    public function getCarrierType(): string
    {
        return CarrierInterface::CARRIER_TYPE_MP3;
    }
}
