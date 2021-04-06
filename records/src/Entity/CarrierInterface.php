<?php
declare(strict_types=1);

namespace Records\Entity;

interface CarrierInterface
{
    public const CARRIER_TYPES = [
        self::CARRIER_TYPE_CD,
        self::CARRIER_TYPE_VINYL,
        self::CARRIER_TYPE_MP3
    ];

    public const CARRIER_TYPE_CD = 'CD';
    public const CARRIER_TYPE_VINYL = 'Vinyl';
    public const CARRIER_TYPE_MP3 = 'mp3';
}
