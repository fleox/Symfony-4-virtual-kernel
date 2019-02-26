<?php

namespace Nostalgie\Tests;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

abstract class NostalgieWebTestCase extends WebTestCase
{
    protected static function createKernel(array $options = array())
    {
        return new \VirtualKernel(
            $options['environment'] ?? 'test',
            $options['debug'] ?? true,
            'nostalgie'
        );
    }
}
