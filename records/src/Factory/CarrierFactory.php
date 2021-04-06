<?php
declare(strict_types=1);

namespace Records\Factory;

use Records\Entity\CarrierInterface;
use Records\Entity\CDCarrier;
use Records\Entity\Mp3Carrier;
use Records\Entity\VinylCarrier;

class CarrierFactory
{
    public function createCarrier(string $carrierType): CarrierInterface
    {
        if(!in_array($carrierType, CarrierInterface::CARRIER_TYPES)) {
            throw new \InvalidArgumentException(sprintf('Carrier type %s not recognized.', $carrierType));
        }
        switch ($carrierType) {
            case CarrierInterface::CARRIER_TYPE_MP3:
                return new Mp3Carrier();
            case CarrierInterface::CARRIER_TYPE_CD:
                return new CDCarrier();
            case CarrierInterface::CARRIER_TYPE_VINYL:
                return new VinylCarrier();
        }
    }
}
