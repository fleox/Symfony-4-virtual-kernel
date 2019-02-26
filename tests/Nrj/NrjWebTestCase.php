<?php

namespace Nrj\Tests;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

abstract class NrjWebTestCase extends WebTestCase
{
    protected static function createKernel(array $options = array())
    {
        return new \VirtualKernel(
            $options['environment'] ?? 'test',
            $options['debug'] ?? true,
            'nrj'
        );
    }
}
